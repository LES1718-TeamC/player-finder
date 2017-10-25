package feup.les.teamc.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import feup.les.teamc.app.domain.GameType;

import feup.les.teamc.app.repository.GameTypeRepository;
import feup.les.teamc.app.repository.search.GameTypeSearchRepository;
import feup.les.teamc.app.web.rest.util.HeaderUtil;
import feup.les.teamc.app.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing GameType.
 */
@RestController
@RequestMapping("/api")
public class GameTypeResource {

    private final Logger log = LoggerFactory.getLogger(GameTypeResource.class);

    private static final String ENTITY_NAME = "gameType";

    private final GameTypeRepository gameTypeRepository;

    private final GameTypeSearchRepository gameTypeSearchRepository;

    public GameTypeResource(GameTypeRepository gameTypeRepository, GameTypeSearchRepository gameTypeSearchRepository) {
        this.gameTypeRepository = gameTypeRepository;
        this.gameTypeSearchRepository = gameTypeSearchRepository;
    }

    /**
     * POST  /game-types : Create a new gameType.
     *
     * @param gameType the gameType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gameType, or with status 400 (Bad Request) if the gameType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/game-types")
    @Timed
    public ResponseEntity<GameType> createGameType(@Valid @RequestBody GameType gameType) throws URISyntaxException {
        log.debug("REST request to save GameType : {}", gameType);
        if (gameType.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new gameType cannot already have an ID")).body(null);
        }
        GameType result = gameTypeRepository.save(gameType);
        gameTypeSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/game-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /game-types : Updates an existing gameType.
     *
     * @param gameType the gameType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gameType,
     * or with status 400 (Bad Request) if the gameType is not valid,
     * or with status 500 (Internal Server Error) if the gameType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/game-types")
    @Timed
    public ResponseEntity<GameType> updateGameType(@Valid @RequestBody GameType gameType) throws URISyntaxException {
        log.debug("REST request to update GameType : {}", gameType);
        if (gameType.getId() == null) {
            return createGameType(gameType);
        }
        GameType result = gameTypeRepository.save(gameType);
        gameTypeSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gameType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /game-types : get all the gameTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of gameTypes in body
     */
    @GetMapping("/game-types")
    @Timed
    public ResponseEntity<List<GameType>> getAllGameTypes(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of GameTypes");
        Page<GameType> page = gameTypeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/game-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /game-types/:id : get the "id" gameType.
     *
     * @param id the id of the gameType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gameType, or with status 404 (Not Found)
     */
    @GetMapping("/game-types/{id}")
    @Timed
    public ResponseEntity<GameType> getGameType(@PathVariable Long id) {
        log.debug("REST request to get GameType : {}", id);
        GameType gameType = gameTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(gameType));
    }

    /**
     * DELETE  /game-types/:id : delete the "id" gameType.
     *
     * @param id the id of the gameType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/game-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteGameType(@PathVariable Long id) {
        log.debug("REST request to delete GameType : {}", id);
        gameTypeRepository.delete(id);
        gameTypeSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/game-types?query=:query : search for the gameType corresponding
     * to the query.
     *
     * @param query the query of the gameType search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/game-types")
    @Timed
    public ResponseEntity<List<GameType>> searchGameTypes(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of GameTypes for query {}", query);
        Page<GameType> page = gameTypeSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/game-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
