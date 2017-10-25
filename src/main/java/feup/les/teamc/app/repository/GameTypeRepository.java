package feup.les.teamc.app.repository;

import feup.les.teamc.app.domain.GameType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the GameType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GameTypeRepository extends JpaRepository<GameType, Long> {

}
