package feup.les.teamc.app.repository.search;

import feup.les.teamc.app.domain.GameType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the GameType entity.
 */
public interface GameTypeSearchRepository extends ElasticsearchRepository<GameType, Long> {
}
