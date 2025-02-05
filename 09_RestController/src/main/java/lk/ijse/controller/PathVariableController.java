package lk.ijse.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("variable")
public class PathVariableController {
    //___>/variable/I432
    @GetMapping(path = "{id:[I][0-9]{3}}")
    public String variable(@PathVariable("id") String id) {
        return id;
    }

    //___>/variable/45
    @GetMapping(path = "{customerID}")
    public String variable2(@PathVariable("customerID") String id) {
        return id;
    }

    //___>/variable/45/Achini
    @GetMapping(path = "{customerID}/{customerName}")
    public String variable3(@PathVariable("customerID") String id, @PathVariable("customerName") String name) {
        return id + " " + name;
    }
}