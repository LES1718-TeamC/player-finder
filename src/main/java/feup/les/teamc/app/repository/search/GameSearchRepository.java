package feup.les.teamc.app.repository.search;

import feup.les.teamc.app.domain.Game;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Game entity.
 */
public interface GameSearchRepository extends ElasticsearchRepository<Game, Long> {
}
