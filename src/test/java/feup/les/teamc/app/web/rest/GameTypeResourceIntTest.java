package feup.les.teamc.app.web.rest;

import feup.les.teamc.app.PlayerFinderApp;

import feup.les.teamc.app.domain.GameType;
import feup.les.teamc.app.repository.GameTypeRepository;
import feup.les.teamc.app.repository.search.GameTypeSearchRepository;
import feup.les.teamc.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import feup.les.teamc.app.domain.enumeration.TypeOfGame;
/**
 * Test class for the GameTypeResource REST controller.
 *
 * @see GameTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlayerFinderApp.class)
public class GameTypeResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final TypeOfGame DEFAULT_TYPE = TypeOfGame.SPORT;
    private static final TypeOfGame UPDATED_TYPE = TypeOfGame.ESPORT;

    @Autowired
    private GameTypeRepository gameTypeRepository;

    @Autowired
    private GameTypeSearchRepository gameTypeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGameTypeMockMvc;

    private GameType gameType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GameTypeResource gameTypeResource = new GameTypeResource(gameTypeRepository, gameTypeSearchRepository);
        this.restGameTypeMockMvc = MockMvcBuilders.standaloneSetup(gameTypeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GameType createEntity(EntityManager em) {
        GameType gameType = new GameType()
            .title(DEFAULT_TITLE)
            .type(DEFAULT_TYPE);
        return gameType;
    }

    @Before
    public void initTest() {
        gameTypeSearchRepository.deleteAll();
        gameType = createEntity(em);
    }

    @Test
    @Transactional
    public void createGameType() throws Exception {
        int databaseSizeBeforeCreate = gameTypeRepository.findAll().size();

        // Create the GameType
        restGameTypeMockMvc.perform(post("/api/game-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameType)))
            .andExpect(status().isCreated());

        // Validate the GameType in the database
        List<GameType> gameTypeList = gameTypeRepository.findAll();
        assertThat(gameTypeList).hasSize(databaseSizeBeforeCreate + 1);
        GameType testGameType = gameTypeList.get(gameTypeList.size() - 1);
        assertThat(testGameType.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testGameType.getType()).isEqualTo(DEFAULT_TYPE);

        // Validate the GameType in Elasticsearch
        GameType gameTypeEs = gameTypeSearchRepository.findOne(testGameType.getId());
        assertThat(gameTypeEs).isEqualToComparingFieldByField(testGameType);
    }

    @Test
    @Transactional
    public void createGameTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gameTypeRepository.findAll().size();

        // Create the GameType with an existing ID
        gameType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGameTypeMockMvc.perform(post("/api/game-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameType)))
            .andExpect(status().isBadRequest());

        // Validate the GameType in the database
        List<GameType> gameTypeList = gameTypeRepository.findAll();
        assertThat(gameTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = gameTypeRepository.findAll().size();
        // set the field null
        gameType.setTitle(null);

        // Create the GameType, which fails.

        restGameTypeMockMvc.perform(post("/api/game-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameType)))
            .andExpect(status().isBadRequest());

        List<GameType> gameTypeList = gameTypeRepository.findAll();
        assertThat(gameTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = gameTypeRepository.findAll().size();
        // set the field null
        gameType.setType(null);

        // Create the GameType, which fails.

        restGameTypeMockMvc.perform(post("/api/game-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameType)))
            .andExpect(status().isBadRequest());

        List<GameType> gameTypeList = gameTypeRepository.findAll();
        assertThat(gameTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGameTypes() throws Exception {
        // Initialize the database
        gameTypeRepository.saveAndFlush(gameType);

        // Get all the gameTypeList
        restGameTypeMockMvc.perform(get("/api/game-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gameType.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getGameType() throws Exception {
        // Initialize the database
        gameTypeRepository.saveAndFlush(gameType);

        // Get the gameType
        restGameTypeMockMvc.perform(get("/api/game-types/{id}", gameType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gameType.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGameType() throws Exception {
        // Get the gameType
        restGameTypeMockMvc.perform(get("/api/game-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGameType() throws Exception {
        // Initialize the database
        gameTypeRepository.saveAndFlush(gameType);
        gameTypeSearchRepository.save(gameType);
        int databaseSizeBeforeUpdate = gameTypeRepository.findAll().size();

        // Update the gameType
        GameType updatedGameType = gameTypeRepository.findOne(gameType.getId());
        updatedGameType
            .title(UPDATED_TITLE)
            .type(UPDATED_TYPE);

        restGameTypeMockMvc.perform(put("/api/game-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGameType)))
            .andExpect(status().isOk());

        // Validate the GameType in the database
        List<GameType> gameTypeList = gameTypeRepository.findAll();
        assertThat(gameTypeList).hasSize(databaseSizeBeforeUpdate);
        GameType testGameType = gameTypeList.get(gameTypeList.size() - 1);
        assertThat(testGameType.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testGameType.getType()).isEqualTo(UPDATED_TYPE);

        // Validate the GameType in Elasticsearch
        GameType gameTypeEs = gameTypeSearchRepository.findOne(testGameType.getId());
        assertThat(gameTypeEs).isEqualToComparingFieldByField(testGameType);
    }

    @Test
    @Transactional
    public void updateNonExistingGameType() throws Exception {
        int databaseSizeBeforeUpdate = gameTypeRepository.findAll().size();

        // Create the GameType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGameTypeMockMvc.perform(put("/api/game-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameType)))
            .andExpect(status().isCreated());

        // Validate the GameType in the database
        List<GameType> gameTypeList = gameTypeRepository.findAll();
        assertThat(gameTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGameType() throws Exception {
        // Initialize the database
        gameTypeRepository.saveAndFlush(gameType);
        gameTypeSearchRepository.save(gameType);
        int databaseSizeBeforeDelete = gameTypeRepository.findAll().size();

        // Get the gameType
        restGameTypeMockMvc.perform(delete("/api/game-types/{id}", gameType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean gameTypeExistsInEs = gameTypeSearchRepository.exists(gameType.getId());
        assertThat(gameTypeExistsInEs).isFalse();

        // Validate the database is empty
        List<GameType> gameTypeList = gameTypeRepository.findAll();
        assertThat(gameTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchGameType() throws Exception {
        // Initialize the database
        gameTypeRepository.saveAndFlush(gameType);
        gameTypeSearchRepository.save(gameType);

        // Search the gameType
        restGameTypeMockMvc.perform(get("/api/_search/game-types?query=id:" + gameType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gameType.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GameType.class);
        GameType gameType1 = new GameType();
        gameType1.setId(1L);
        GameType gameType2 = new GameType();
        gameType2.setId(gameType1.getId());
        assertThat(gameType1).isEqualTo(gameType2);
        gameType2.setId(2L);
        assertThat(gameType1).isNotEqualTo(gameType2);
        gameType1.setId(null);
        assertThat(gameType1).isNotEqualTo(gameType2);
    }
}
