package com.meet.HotelService.dto;

import lombok.Data;

@Data
public class SignupRequest {

    private String email;
    private String password;

    private String name;
}
