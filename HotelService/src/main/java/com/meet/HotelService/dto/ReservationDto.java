package com.meet.HotelService.dto;

import com.meet.HotelService.enums.ReservationStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ReservationDto {
    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Long price;
    private ReservationStatus reservationStatus;
    private Long roomId;
    private String roomType;
    private String roomName;
    private Long userId;
    private String username;
}
