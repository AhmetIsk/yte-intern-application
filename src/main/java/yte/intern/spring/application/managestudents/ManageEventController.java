package yte.intern.spring.application.managestudents;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.spring.application.common.dto.MessageResponse;
import yte.intern.spring.application.managestudents.dto.EventDTO;
import yte.intern.spring.application.managestudents.dto.ParticipantDTO;
import yte.intern.spring.application.managestudents.entity.Event;
import yte.intern.spring.application.managestudents.entity.Participant;
import yte.intern.spring.application.managestudents.mapper.EventMapper;
import yte.intern.spring.application.managestudents.mapper.ParticipantMapper;

import javax.servlet.http.Part;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
//@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" }) // sonra eklendi
@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/events")
/*
  @Validated annotation'ına girmeye vaktim olmadı. @Validated, spring'in sağladığı bir annotation ve @PathVariabl
  ve @RequestParam gibi obje tabanlı olmayan, doğrudan controller fonksiyonu parametresine alınan argümanları validate etmek için
  kullanılır. Fark ettiyseniz tüm @PathVariable'ların başında @Size gibi validation'lar koydum, bu path variable'lar ile
  de yanlış input yollanmasının önüne geçmek için. Bunları @Valid ile yapamıyoruz arkadaşlar, @Valid spring için sadece
  obje validation'larında çalışıyor, normal parametreleri validate etmiyor spring. Bunun için, class'ımızın başına @Validated
  yazarak doğrudan obje olmayan argümanlarımızın validation'larını da sağlıyoruz.
 */
public class ManageEventController {

	private final ParticipantMapper participantMapper;
	private final EventMapper eventMapper;
	private final ManageEventService manageEventService;

	@GetMapping
	public List<EventDTO> listAllEvents() {
		List<Event> event = manageEventService.listAllEvents();
		return eventMapper.mapToDto(event);
	}

	@GetMapping("/{nameOfEvent}")
	public EventDTO getEventByName(@PathVariable String nameOfEvent) {
		Event event = manageEventService.getEventByName(nameOfEvent);
		return eventMapper.mapToDto(event);
	}

//	@GetMapping("/{nameOfEvent}")
//	public Integer getParticipantNumOfEvent(@PathVariable String nameOfEvent) {
//		return manageEventService.getEventByName(nameOfEvent).getParticipants().size();
//	}

	@PostMapping
	public MessageResponse addEvent(@Valid @RequestBody EventDTO eventDTO) {
		Event event = eventMapper.mapToEntity(eventDTO);
		return manageEventService.addEvent(event);
	}

	@PutMapping("/{nameOfEvent}")
	public MessageResponse updateEvent(@PathVariable String nameOfEvent, @Valid @RequestBody EventDTO eventDTO) {
		Event event = eventMapper.mapToEntity(eventDTO);
		return manageEventService.updateEvent(nameOfEvent, event);
	}

	@DeleteMapping("/{nameOfEvent}")
	public MessageResponse deleteEvent(@PathVariable String nameOfEvent) {
		return manageEventService.deleteEvent(nameOfEvent);
	}

	@GetMapping("/{nameOfEvent}/participants")
	public List<ParticipantDTO> getEventsParticipants(@PathVariable String nameOfEvent) {
		Set<Participant> participantsEvents = manageEventService.getEventsParticipants(nameOfEvent);
		return participantMapper.mapToDto(new ArrayList<>(participantsEvents));
	}

	@PostMapping("/{nameOfEvent}/participants")
	public MessageResponse addParticipantToEvent(@PathVariable String nameOfEvent, @RequestBody @Valid ParticipantDTO participantDTO) {
		return manageEventService.addParticipantToEvent(nameOfEvent, participantMapper.mapToEntity(participantDTO));
	}

	@DeleteMapping("/{nameOfEvent}/participants/{tcKimlikNo}")
	public MessageResponse deleteParticipantFromEvent(@PathVariable  String nameOfEvent, @PathVariable String participantName) {
		return manageEventService.deleteParticipant(nameOfEvent, participantName);
	}
}
