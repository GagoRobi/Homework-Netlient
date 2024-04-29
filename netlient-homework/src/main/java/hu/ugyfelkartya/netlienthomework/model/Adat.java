package hu.ugyfelkartya.netlienthomework.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Adat {
    //cikkszám, cikk megnevezés, nettó ár, áfa
    @Id
    @GeneratedValue
    private Long id; //cikkszám
    private String name; //cikk megnevezése
    private double price; //nettó ár
    private double vat; //áfa
}
