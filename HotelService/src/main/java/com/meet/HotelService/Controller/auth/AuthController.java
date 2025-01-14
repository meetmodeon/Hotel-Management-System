package com.meet.HotelService.Controller.auth;

import com.meet.HotelService.dto.AuthenticationRequest;
import com.meet.HotelService.dto.AuthenticationResponse;
import com.meet.HotelService.dto.SignupRequest;
import com.meet.HotelService.dto.UserDto;
import com.meet.HotelService.entity.User;
import com.meet.HotelService.repository.UserRepository;
import com.meet.HotelService.services.auth.AuthService;
import com.meet.HotelService.services.auth.jwt.UserDetialsImpl;
import com.meet.HotelService.util.JwtUtil;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserDetialsImpl userDetailsService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;


    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest){
        try{
            UserDto createdUser = authService.createUser(signupRequest);
            return new ResponseEntity<>(createdUser, HttpStatus.OK);
        }catch (EntityExistsException e){
            return new ResponseEntity<>("User already exists",HttpStatus.NOT_ACCEPTABLE);
        }catch (Exception e){
            return new ResponseEntity<>("User not created, come again later",HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> createAuthentication(@RequestBody AuthenticationRequest authenticationRequest){

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),authenticationRequest.getPassword()));

            final UserDetails userDetails=userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
            Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());

            final String jwt= jwtUtil.generateToken(userDetails.getUsername());
            if(optionalUser.isPresent()){
               AuthenticationResponse authenticationResponse=new AuthenticationResponse();
               authenticationResponse.setJwt(jwt);
               authenticationResponse.setUserId(optionalUser.get().getId());
               authenticationResponse.setUserRole(optionalUser.get().getUserRole());
                return ResponseEntity.status(HttpStatus.OK).body(authenticationResponse);
            }else {
                return new ResponseEntity<>("User not Found",HttpStatus.NOT_FOUND);
            }
        }catch (BadCredentialsException e){
            throw new BadCredentialsException("Incorrect username or password.");
        }
    }
}
