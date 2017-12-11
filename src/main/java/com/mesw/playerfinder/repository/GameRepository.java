package com.mesw.playerfinder.repository;

import com.mesw.playerfinder.domain.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the Game entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    @Query("select game from Game game where game.owner.login = ?#{principal.username}")
    Page<Game> findByOwnerIsCurrentUser(Pageable pageable);

    @Query("select game from Game game where game.owner.login = ?#{principal.username} and game.title =:query")
    Page<Game> findByOwnerIsCurrentUserQuery(Pageable pageable, @Param("query")String query);

    @Query("select distinct game from Game game left join fetch game.players")
    List<Game> findAllWithEagerRelationships();

    @Query("select game from Game game left join fetch game.players where game.id =:id")
    Game findOneWithEagerRelationships(@Param("id") Long id);

    Page<Game> findByTitle(Pageable pageable, String title);
}
