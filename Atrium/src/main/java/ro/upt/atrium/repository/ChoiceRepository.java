package ro.upt.atrium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.upt.atrium.model.Choice;

public interface ChoiceRepository extends JpaRepository<Choice, Long> {

    Choice findChoiceByChoiceid(Long choiceid);
}
