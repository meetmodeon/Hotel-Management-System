package com.meet.HotelService.services.auth;

import com.meet.HotelService.dto.RoomsResponseDto;
import com.meet.HotelService.dto.SignupRequest;
import com.meet.HotelService.dto.UserDto;

public interface AuthService {
    UserDto createUser(SignupRequest signupRequest);

}
