package com.meet.HotelService.services.auth.admin.reservation;

import com.meet.HotelService.dto.ReservationResponseDto;

public interface ReservationService {

    ReservationResponseDto getAllReservation(int pageNumber);
    boolean changeReservationStatus(Long id, String status);
}
