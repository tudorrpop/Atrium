package ro.upt.atrium.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.upt.atrium.model.Choice;
import ro.upt.atrium.repository.ChoiceRepository;

import java.util.List;

@Service
public class ChoiceService {

    private final ChoiceRepository choiceRepository;

    @Autowired
    public ChoiceService(ChoiceRepository choiceRepository){
        this.choiceRepository = choiceRepository;
    }

    public void saveChoice(Choice choice){
        choiceRepository.save(choice);
    }

    public void deleteChoice(Choice choice){
        choiceRepository.delete(choice);
    }

    public void deleteChoice(Long choiceid){
        choiceRepository.deleteById(choiceid);
    }

    public List<Choice> getChoices(){
        return choiceRepository.findAll();
    }

    public Choice getChoice(Long choiceid){
        return choiceRepository.findChoiceByChoiceid(choiceid);
    }

}
