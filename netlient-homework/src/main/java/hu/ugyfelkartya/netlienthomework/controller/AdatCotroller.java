package hu.ugyfelkartya.netlienthomework.controller;

import hu.ugyfelkartya.netlienthomework.model.entity.Adat;
import hu.ugyfelkartya.netlienthomework.service.AdatService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    public Page<Adat> findAllPageable(@RequestParam int page, @RequestParam int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return adatService.findAll(pageRequest);
    }

    @GetMapping("/sorted")
    public Page<Adat> findAllPageableSorted(@RequestParam int page, @RequestParam int size,
                                            @RequestParam boolean asc, @RequestParam String category) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(category));
        if (asc) {
            pageRequest = PageRequest.of(page, size, Sort.by(category).ascending());
        } else {
            pageRequest = PageRequest.of(page, size, Sort.by(category).descending());

        }
        return adatService.findAll(pageRequest);
    }

    @GetMapping("/search")
    public Page<Adat> findPageableFilteredBySearch(@RequestParam int page, @RequestParam int size, @RequestParam String namePart) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return adatService.findAllByNameContaining(namePart, pageRequest);
    }

    @GetMapping("/search-sorted")
    public Page<Adat> findPageableFilteredBySearchSorted(@RequestParam int page, @RequestParam int size,
                                            @RequestParam boolean asc, @RequestParam String category, String namePart) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(category).ascending());
        if (asc) {
            pageRequest = PageRequest.of(page, size, Sort.by(category).ascending());
        } else {
            pageRequest = PageRequest.of(page, size, Sort.by(category).descending());

        }
        return adatService.findAllByNameContaining(namePart, pageRequest);
    }


}
