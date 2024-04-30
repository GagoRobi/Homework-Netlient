package hu.ugyfelkartya.netlienthomework.controller;

import hu.ugyfelkartya.netlienthomework.model.Adat;
import hu.ugyfelkartya.netlienthomework.repository.AdatRepository;
import hu.ugyfelkartya.netlienthomework.service.AdatService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/adat")
public class AdatCotroller {
    private final AdatService adatService;

    public AdatCotroller(AdatService adatService) {
        this.adatService = adatService;
    }

    @GetMapping
    public Page<Adat> findAll(@RequestParam int page, @RequestParam int size){
        PageRequest pageRequest= PageRequest.of(page, size);
        return adatService.findAll(pageRequest);
    }
}
