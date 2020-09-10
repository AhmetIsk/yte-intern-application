//package yte.intern.spring.application.managestudents.controller;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//import yte.intern.spring.application.managestudents.dto.LoginRequest;
//import yte.intern.spring.application.managestudents.dto.LoginResponse;
//import yte.intern.spring.application.managestudents.service.LoginService;
//
//import javax.validation.Valid;
//
//@RestController
//@RequiredArgsConstructor
//public class LoginController {
//
//	private final LoginService loginService;
//
//	@PostMapping("/login")
//	public LoginResponse login(@Valid @RequestBody final LoginRequest loginRequest) {
//		return loginService.login(loginRequest);
//	}}
