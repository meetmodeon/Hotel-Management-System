package com.meet.HotelService.services.auth;

import com.meet.HotelService.dto.RoomsResponseDto;
import com.meet.HotelService.dto.SignupRequest;
import com.meet.HotelService.dto.UserDto;
import com.meet.HotelService.entity.Room;
import com.meet.HotelService.entity.User;
import com.meet.HotelService.enums.UserRole;
import com.meet.HotelService.repository.RoomRepository;
import com.meet.HotelService.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    @PostConstruct
    public void createAnAdminAccount(){
        Optional<User> adminAccount = userRepository.findByUserRole(UserRole.ADMIN);
        if(adminAccount.isEmpty()){
            User user= new User();
            user.setEmail("admin@test.com");
            user.setName("Admin");
            user.setUserRole(UserRole.ADMIN);
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepository.save(user);
            System.out.println("Admin account created successfully");
        }else {
            System.out.println("Admin account already exist");
        }

    }

    public UserDto createUser(SignupRequest signupRequest){
        if(userRepository.findFirstByEmail(signupRequest.getEmail()).isPresent()){
            throw new EntityExistsException("User Already Present With email"+signupRequest.getEmail());
        }
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setUserRole(UserRole.CUSTOMER);
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        User createdUser=userRepository.save(user);
        return createdUser.getUserDto();
    }


}
