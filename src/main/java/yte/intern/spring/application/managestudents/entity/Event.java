package yte.intern.spring.application.managestudents.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yte.intern.spring.application.common.entity.BaseEntity;
import yte.intern.spring.application.managestudents.repository.EventRepository;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "EVENT_SEQ")
@AllArgsConstructor
@NoArgsConstructor
public class Event extends BaseEntity {

	@Column(name = "NAME_OF_EVENT", unique = true)
	private String nameOfEvent;

	@Column(name = "STARTING_DATE")
	private LocalDate startingDate;

	@Column(name = "END_DATE")
	private LocalDate endDate;

	@Column(name = "ADDRESS")
	private String address;

	@Column(name = "MAX_QUOTA")
	private Long maxQuota;

	@OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
	private Set<Participant> participants;

	//public boolean hasFiveParticipants() {
	//	return participants.size() == 5;
	//}

	public boolean hasParticipants(String tcKimlikNo) {
		return participants.stream().anyMatch(it -> it.getTcKimlikNo().equals(tcKimlikNo));
	}
}
