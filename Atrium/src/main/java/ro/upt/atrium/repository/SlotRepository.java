package ro.upt.atrium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.upt.atrium.model.Slot;

public interface SlotRepository extends JpaRepository<Slot, Long> {

}
