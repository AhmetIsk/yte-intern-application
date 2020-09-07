package yte.intern.spring.application.managestudents.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Builder
public class EventDTO {

	@JsonProperty("nameOfEvent")
	@Size(max = 255, message = "Name of event can be at most 255 characters!")
	public final String nameOfEvent;

	@JsonProperty("startingDate")
	@FutureOrPresent(message = "Starting date can't be in the past!")
	public final LocalDate startingDate;

	@JsonProperty("endDate")
	public final LocalDate endDate;

	@JsonProperty("address")
	@Size(min = 100, message = "Address of event can't be less than 100 characters!")
	public final String address;

	@JsonProperty("maxQuota")
	@Min(value = 1, message = "Participant Quota should be minimum 1!")
	@Max(value = 1500, message = "Participant Quota can be maximum 1500!")
	public final Long maxQuota;


	@AssertTrue (message = "End date should be after than starting date!")
	public boolean isBeforeStartingDate() {return endDate.isAfter(startingDate);}



	public EventDTO(@JsonProperty("nameOfEvent") String nameOfEvent,
					@JsonProperty("startingDate") LocalDate startingDate,
					@JsonProperty("endDate") LocalDate endDate,
					@JsonProperty("address") String address,
					@JsonProperty("maxQuota") Long maxQuota) {
		this.nameOfEvent = nameOfEvent;
		this.endDate = endDate;
		this.startingDate = startingDate;
		this.address = address;
		this.maxQuota = maxQuota;
	}
}
