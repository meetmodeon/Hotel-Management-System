package com.meet.HotelService.services.customer.room;

import com.meet.HotelService.dto.RoomsResponseDto;
import com.meet.HotelService.entity.Room;
import com.meet.HotelService.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomsServiceImpl implements RoomsService {
   private final RoomRepository roomRepository;

    public RoomsResponseDto getAvailableRooms(int pageNumber){
        Pageable pageable= PageRequest.of(pageNumber,6);
        Page<Room> roomPage= roomRepository.findByAvailable(true,pageable);

        RoomsResponseDto roomsResponseDto=new RoomsResponseDto();
        roomsResponseDto.setPageNumber(roomPage.getPageable().getPageNumber());
        roomsResponseDto.setTotalPages(roomPage.getTotalPages());
        roomsResponseDto.setRoomDtoList(roomPage.stream().map(Room::getRoomDto).collect(Collectors.toList()));

        return roomsResponseDto;
    }
}
