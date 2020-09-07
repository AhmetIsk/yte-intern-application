package yte.intern.spring.application.managestudents.entity;

import lombok.Getter;
import lombok.Setter;
import yte.intern.spring.application.common.entity.BaseEntity;
import yte.intern.spring.application.managestudents.validation.TcKimlikNo;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "PARTICIPANT_SEQ")
public class Participant extends BaseEntity {

	@Column(name = "NAME")
	private String name;

	@Column(name = "SURNAME")
	private String surname;


	@Column(name = "EMAIL")
	private String email;

	//@TcKimlikNo
	@Column(name = "TC_KIMLIK_NO")
	private String tcKimlikNo;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "event_id")
	private Event event;


}
