package com.meet.HotelService.services.customer.booking;

import com.meet.HotelService.dto.ReservationDto;
import com.meet.HotelService.dto.ReservationResponseDto;
import com.meet.HotelService.entity.Reservation;
import com.meet.HotelService.entity.Room;
import com.meet.HotelService.entity.User;
import com.meet.HotelService.enums.ReservationStatus;
import com.meet.HotelService.repository.ReservationRepository;
import com.meet.HotelService.repository.RoomRepository;
import com.meet.HotelService.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookingService{
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ReservationRepository reservationRepository;
    private static final int SEARCH_RESULT_PER_PAGE = 4;

    public boolean postReservation(ReservationDto reservationDto){
        System.out.println(reservationDto.toString());
        Optional<User> optionalUser = userRepository.findById(reservationDto.getUserId());
        Optional<Room> optionalRoom = roomRepository.findById(reservationDto.getRoomId());
        if (optionalUser.isPresent() && optionalRoom.isPresent()){
            Reservation reservation=new Reservation();

            reservation.setRoom(optionalRoom.get());
            reservation.setUser(optionalUser.get());
            reservation.setCheckInDate(reservationDto.getCheckInDate());
            reservation.setCheckOutDate(reservationDto.getCheckOutDate());
            reservation.setReservationStatus(ReservationStatus.PENDING);

            LocalDate checkInDate = reservationDto.getCheckInDate();
            LocalDate checkOutDate = reservationDto.getCheckOutDate();

            // Convert LocalDate to LocalDateTime (with time 00:00:00)
            LocalDateTime checkInDateTime = checkInDate.atStartOfDay();
            LocalDateTime checkOutDateTime = checkOutDate.atStartOfDay();

            // Calculate the difference in days using Duration
            long days = Duration.between(checkInDateTime, checkOutDateTime).toDays(); ;
            reservation.setPrice(optionalRoom.get().getPrice()*days);
            reservationRepository.save(reservation);
            return true;

        }
        return false;
    }

    public ReservationResponseDto getAllReservationByUserId(Long userId,int pageNumber){
        Pageable pageable= PageRequest.of(pageNumber,SEARCH_RESULT_PER_PAGE);
        Page<Reservation> reservationPage = reservationRepository.findAllByUserId(pageable,userId);

        ReservationResponseDto reservationResponseDto = new ReservationResponseDto();

        reservationResponseDto.setReservationDtoList(reservationPage.stream().map(Reservation::getReservationDto).collect(Collectors.toList()));
        reservationResponseDto.setPageNumber(reservationPage.getPageable().getPageNumber());
        reservationResponseDto.setTotalPages(reservationPage.getTotalPages());

        return reservationResponseDto;
    }
}
