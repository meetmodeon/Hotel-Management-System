package com.meet.HotelService.repository;

import com.meet.HotelService.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room,Long> {

    Page<Room> findByAvailable(boolean available, Pageable pageable);
}
