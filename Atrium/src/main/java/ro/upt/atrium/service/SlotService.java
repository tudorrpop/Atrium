package ro.upt.atrium.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.upt.atrium.model.Course;
import ro.upt.atrium.model.Slot;
import ro.upt.atrium.repository.SlotRepository;

import java.util.List;

@Service
public class SlotService {

    private final SlotRepository slotRepository;
    @Autowired
    public SlotService(SlotRepository slotRepository){
        this.slotRepository = slotRepository;
    }

    public List<Slot> createSlots(List<Slot> slots){
        return slotRepository.saveAll(slots);
    }

    public Slot createSlot(Slot slot){
        return slotRepository.save(slot);
    }
}
