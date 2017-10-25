package feup.les.teamc.app.repository;

import feup.les.teamc.app.domain.Game;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Game entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    @Query("select distinct game from Game game left join fetch game.players")
    List<Game> findAllWithEagerRelationships();

    @Query("select game from Game game left join fetch game.players where game.id =:id")
    Game findOneWithEagerRelationships(@Param("id") Long id);

}
