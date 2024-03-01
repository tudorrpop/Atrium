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

    public List<Choice> getAllChoices(){
        return choiceRepository.findAll();
    }

    public Choice getChoice(Long choiceid){
        return choiceRepository.findChoiceByChoiceid(choiceid);
    }

    public void saveChoice(Choice choice){
        choiceRepository.save(choice);
    }


    public void createChoice(Choice choice){
        choiceRepository.save(choice);
    }

}
