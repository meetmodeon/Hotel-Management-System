package com.meet.HotelService.services.customer.room;

import com.meet.HotelService.dto.RoomsResponseDto;

public interface RoomsService {
    RoomsResponseDto getAvailableRooms(int pageNumber);
}
