package yte.intern.spring.application.managestudents;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import yte.intern.spring.application.common.dto.MessageResponse;
import yte.intern.spring.application.managestudents.entity.Event;
import yte.intern.spring.application.managestudents.entity.Participant;
import yte.intern.spring.application.managestudents.repository.EventRepository;
import yte.intern.spring.application.managestudents.repository.ParticipantRepository;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static java.util.stream.Collectors.toSet;
import static yte.intern.spring.application.common.enums.MessageType.ERROR;
import static yte.intern.spring.application.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class ManageEventService {

	private final ParticipantRepository participantRepository;
	private final EventRepository eventRepository;


	public List<Event> listAllEvents() {
		return eventRepository.findAll();
	}

	public Event getEventByName(String nameOfEvent) {
		return eventRepository.findByNameOfEvent(nameOfEvent).orElseThrow(EntityNotFoundException::new);
	}

	public Set<Participant> getEventsParticipants(String nameOfEvent) {
		return eventRepository.findByNameOfEvent(nameOfEvent).map(Event::getParticipants)
				.orElseThrow(EntityNotFoundException::new);
	}

//	public Integer getParticipantNumOfEvent(@PathVariable String nameOfEvent) {
//		return  getEventByName(nameOfEvent).getParticipants().size();
//	}

	public MessageResponse addEvent(Event event) {
		if(eventRepository.existsByNameOfEvent(event.getNameOfEvent())) {
			return new MessageResponse(String.format("Event %s is already exist!", event.getNameOfEvent()), ERROR);
		}
		eventRepository.save(event);
		return new MessageResponse("Event has been added successfully!", SUCCESS);
	}

	/*
		Derste update ile ilgili bir problem olmuştu. Bunun sebebi, version kullandığımız için ID'sini setlediğimiz
		controller'dan gelen entity'i yeni bir entity olarak algılıyordu. Onu düzelttikten sonra da book'lar olmadığı için
		hata hattı. Bu sebeple bir entity'i güncellemenin en iyi yolunun doğrudan veri tabanından getirdiğimiz entity'nin
		field'larını controller'dan gelen entity ile güncellemek olduğunu fark ettim. Orjinal çözüm kadar temiz değil, ama
		çalışıyor. Öbür türlü tüm relation'ları tek tek zaten map'lememiz gerekiyordu. Onun yerine doğrudan veri tabanından
		gelen entity'i güncellemenin daha mantıklı olduğuna karar verdim.
	 */
	@Transactional
	public MessageResponse updateEvent(String nameOfEvent, Event event) {
		Optional<Event> eventOptional = eventRepository.findByNameOfEvent(nameOfEvent);
		if (eventOptional.isPresent()) {
			Event eventFromDB = eventOptional.get();
			updateEventFromDB(event, eventFromDB);
			eventRepository.save(eventFromDB);
			return new MessageResponse(String.format("Event %s with specified name is has been updated successfully!", nameOfEvent), SUCCESS);
		} else {
			return new MessageResponse(String.format("Event %s with specified name can't be found!", nameOfEvent), ERROR);
		}

	}

	private void updateEventFromDB(Event event, Event eventFromDB) {
		eventFromDB.setAddress(event.getAddress());
		eventFromDB.setEndDate(event.getEndDate());
		eventFromDB.setNameOfEvent(event.getNameOfEvent());
		eventFromDB.setStartingDate(event.getStartingDate());
		eventFromDB.setMaxQuota(event.getMaxQuota());
		eventFromDB.setParticipantNum(event.getParticipantNum());
	}

	public MessageResponse deleteEvent(String nameOfEvent) {
		if (eventRepository.existsByNameOfEvent(nameOfEvent)) {
			eventRepository.deleteByNameOfEvent(nameOfEvent);
			return new MessageResponse(String.format("Event with given name %s has been been deleted successfully!", nameOfEvent), SUCCESS);
		} else {
			return new MessageResponse(String.format("Event with given name %s can't be found!", nameOfEvent), ERROR);
		}
	}

	/**
	 * Burada bussiness rule'larımızı işletiyoruz. Eğer öğrencinin 5 kitabı varsa veya eklenmeye çalışılan kitap
	 * zaten öğrencinin elinde varsa bir exception fırlatıyoruz(genellikle exception fırlatmak yerine özel bir error nesnesi
	 * dönmek daha mantıklı, fakat aşırı karmaşık olacağı için şimdilik sadece exception fırlatmayı tercih ettim. Fakat
	 * bazıları bussiness rule'ların oluşan hatalar için exception fırmatlamanın doğru olmadığını söylüyorlar, detaylı bir konu)
	 * Burda service layer'ında bussiness rule'ların kontrolünü yapmak yerine, bu kontrolleri doğrudan entity'nin üzerine attım.
	 * Bu da biraz daha advanced seviyede büyük uygulamalarda görebileceğiniz bir pratik. Mümkün olduğunca bussiness rule execution'larını
	 * entity'lerin üzerine atmanın iyi olduğunu söylüyorlar. O yüzden burda if(student.getEvents().size == 5) gibi bir kod yerine doğrudan
	 * student'a 5 kitabı olup olmadığını soruyorum.
	 */
	public MessageResponse addParticipantToEvent(String nameOfEvent, Participant participant) {
		Optional<Event> eventOptional = eventRepository.findByNameOfEvent(nameOfEvent);
		if (eventOptional.isPresent()) {
			Event event = eventOptional.get();
			Set<Participant> participants = event.getParticipants();
			Long size = Long.valueOf(participants.size());

			if (event.getMaxQuota() == size) {
				return new MessageResponse(String.format("Event %s is already full!", nameOfEvent), ERROR);
			} else if (event.hasParticipants(participant.getTcKimlikNo())) {
				return new MessageResponse(String.format("Event %s with participant kimlik no %s has already this participant", nameOfEvent, participant.getTcKimlikNo()), ERROR);
			}
			else {
				event.getParticipants().add(participant);
				event.setParticipantNum(Long.valueOf(participants.size()));
				// participant.getEvents().add(event);
				participant.setEvent(event);
				//eventRepository.save(event);
				participantRepository.save(participant);

				return new MessageResponse(String.format("Participant with tc no %s has been added to participant successfylly!", participant.getTcKimlikNo()), SUCCESS);
			}
		} else {
			return new MessageResponse(String.format("Event with given name %s can't be found!", nameOfEvent), ERROR);
		}
	}

	/*
		Burada tuhaf şeyler oluyor arkadaşlar. Hibernate, bir sete, doğrudan assigning yapmayı sevmiyor. Orjinal olarak
		burda student.setEvents(filteredBooks) yapıyordum, fakat set referansı değiştiği anda hibernate hata atıyor. Çözüm
		olarak seti temizleyip, filtre edilmiş seti student'ımızın book'larına ekleyip kaydediyoruz. Bu sayede hibernate hata
		atmıyor, bizde istediğimiz elemanı setten çıkarmış oluyoruz.
	 */
	public MessageResponse deleteParticipant(String nameOfEvent, String tcKimlikNo) {
		Optional<Event> eventOptional = eventRepository.findByNameOfEvent(nameOfEvent);
		if (eventOptional.isPresent()) {
			Event event = eventOptional.get();
			if(!event.hasParticipants(tcKimlikNo)) {
				return new MessageResponse(String.format("Event with given name %s doesn't have participant with tc no %s!", nameOfEvent, tcKimlikNo),ERROR);
			}
			removeParticipantFromEvent(tcKimlikNo, event);
			event.setParticipantNum(event.getParticipantNum()-1);
			eventRepository.save(event);
			return new MessageResponse(String.format("Participant with tc no %s has been deleted from event successfully!", tcKimlikNo), SUCCESS);
		}
		return new MessageResponse(String.format("Event with given name %s can't be found!", nameOfEvent), ERROR);
	}


	private void removeParticipantFromEvent(String tcKimlikNo, Event event) {
		Set<Participant> filteredParticipants = event.getParticipants()
				.stream()
				.filter(it -> !it.getTcKimlikNo().equals(tcKimlikNo))
				.collect(toSet());

		event.getParticipants().clear();
		event.getParticipants().addAll(filteredParticipants);
	}
}
