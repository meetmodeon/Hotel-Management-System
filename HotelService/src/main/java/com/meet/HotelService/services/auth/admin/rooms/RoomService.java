package com.meet.HotelService.services.auth.admin.rooms;

import com.meet.HotelService.dto.RoomDto;
import com.meet.HotelService.dto.RoomsResponseDto;

public interface RoomService {
    boolean postRoom(RoomDto roomDto);
    RoomsResponseDto getAllRooms(int pageNumber);
    RoomDto getRoomById(Long id);
    boolean updateRoom(Long id, RoomDto roomDto);
    void deleteRoom(Long id);
}
