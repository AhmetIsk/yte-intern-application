package yte.intern.spring.application.managestudents.mapper;

import org.mapstruct.Mapper;
import yte.intern.spring.application.managestudents.dto.ParticipantDTO;
import yte.intern.spring.application.managestudents.entity.Participant;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParticipantMapper {

	ParticipantDTO mapToDto(Participant participant);

	Participant mapToEntity(ParticipantDTO participantDTO);

	List<ParticipantDTO> mapToDto(List<Participant> participantList);

	List<Participant> mapToEntity(List<ParticipantDTO> participantDTOList);
}
