package lk.ijse.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("hello")

public class HelloController {
    public HelloController() {
        System.out.println("Hello Controller");
    }

    @GetMapping
    public String hello(){
        return "Hello World";
    }

    @GetMapping("/test")
    public String test(){
        return "Test";
    }
}
