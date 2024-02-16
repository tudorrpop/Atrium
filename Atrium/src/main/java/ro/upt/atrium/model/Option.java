package ro.upt.atrium.model;

import jakarta.persistence.*;
import lombok.Getter;
@Entity
@Getter
public class Option {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long optionid;



}
