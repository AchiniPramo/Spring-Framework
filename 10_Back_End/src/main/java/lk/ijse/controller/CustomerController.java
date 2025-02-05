package lk.ijse.controller;

import lk.ijse.dto.CustomerDTO;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/customer")

public class CustomerController {
    List<CustomerDTO> customers = new ArrayList<>();
    @PostMapping("save")
    public CustomerDTO saveCustomer(@RequestBody CustomerDTO customerDTO){
        customers.add(customerDTO);
        return  customerDTO;
    }

    @PutMapping("update")
    public CustomerDTO updateCustomer(@RequestBody CustomerDTO customerDTO){
        for(int i = 0; i < customers.size();i++){
            CustomerDTO excitingCustomer = customers.get(i);
            if(excitingCustomer.getId().equals(customerDTO.getId())){
                excitingCustomer.setName(customerDTO.getName());
                excitingCustomer.setAddress(customerDTO.getAddress());
                excitingCustomer.setAge(customerDTO.getAge());
                return excitingCustomer;
            }
        }
        return  customerDTO;
    }

    @GetMapping("getAll")
    public List<CustomerDTO> getAllCustomer(){
        List<CustomerDTO> customerDTOList = new ArrayList<>();
        return customers;
    }

    @DeleteMapping(path= "delete/{id}")
    public void deleteCustomer(@PathVariable (value = "id")String id){
        for(int i = 0; i < customers.size();i++){
            CustomerDTO excitingCustomer = customers.get(i);
            if(excitingCustomer.getId().equals(id)){
                customers.remove(i);
                return true;
            }
    }
        return false;
    }
}


