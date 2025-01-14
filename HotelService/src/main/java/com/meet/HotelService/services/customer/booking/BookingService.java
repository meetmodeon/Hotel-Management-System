package com.meet.HotelService.services.customer.booking;

import com.meet.HotelService.dto.ReservationDto;
import com.meet.HotelService.dto.ReservationResponseDto;

public interface BookingService {

    boolean postReservation(ReservationDto reservationDto);
    ReservationResponseDto getAllReservationByUserId(Long userId, int pageNumber);
}
