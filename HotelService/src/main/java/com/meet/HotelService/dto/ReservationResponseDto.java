package com.meet.HotelService.dto;

import lombok.Data;

import java.util.List;

@Data
public class ReservationResponseDto {
    private Integer totalPages;
    private Integer pageNumber;
    private List<ReservationDto> reservationDtoList;
}
