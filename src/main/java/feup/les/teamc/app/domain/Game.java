package feup.les.teamc.app.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import feup.les.teamc.app.domain.enumeration.GameStatus;

/**
 * The Game entity.
 */
@ApiModel(description = "The Game entity.")
@Entity
@Table(name = "game")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "game")
public class Game implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 35)
    @Column(name = "title", length = 35, nullable = false)
    private String title;

    @NotNull
    @Column(name = "begin_time", nullable = false)
    private ZonedDateTime beginTime;

    @NotNull
    @Column(name = "end_time", nullable = false)
    private ZonedDateTime endTime;

    @NotNull
    @Min(value = 1)
    @Column(name = "number_of_players", nullable = false)
    private Integer numberOfPlayers;

    @NotNull
    @Min(value = 1)
    @Column(name = "required_number_of_players", nullable = false)
    private Integer requiredNumberOfPlayers;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "game_status", nullable = false)
    private GameStatus gameStatus;

    @Size(max = 100)
    @Column(name = "description", length = 100)
    private String description;

    @OneToOne
    @JoinColumn(unique = true)
    private Location location;

    @OneToOne
    @JoinColumn(unique = true)
    private User owner;

    @OneToOne
    @JoinColumn(unique = true)
    private GameType typeOfGame;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "game_players",
               joinColumns = @JoinColumn(name="games_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="players_id", referencedColumnName="id"))
    private Set<User> players = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Game title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ZonedDateTime getBeginTime() {
        return beginTime;
    }

    public Game beginTime(ZonedDateTime beginTime) {
        this.beginTime = beginTime;
        return this;
    }

    public void setBeginTime(ZonedDateTime beginTime) {
        this.beginTime = beginTime;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public Game endTime(ZonedDateTime endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

    public Integer getNumberOfPlayers() {
        return numberOfPlayers;
    }

    public Game numberOfPlayers(Integer numberOfPlayers) {
        this.numberOfPlayers = numberOfPlayers;
        return this;
    }

    public void setNumberOfPlayers(Integer numberOfPlayers) {
        this.numberOfPlayers = numberOfPlayers;
    }

    public Integer getRequiredNumberOfPlayers() {
        return requiredNumberOfPlayers;
    }

    public Game requiredNumberOfPlayers(Integer requiredNumberOfPlayers) {
        this.requiredNumberOfPlayers = requiredNumberOfPlayers;
        return this;
    }

    public void setRequiredNumberOfPlayers(Integer requiredNumberOfPlayers) {
        this.requiredNumberOfPlayers = requiredNumberOfPlayers;
    }

    public GameStatus getGameStatus() {
        return gameStatus;
    }

    public Game gameStatus(GameStatus gameStatus) {
        this.gameStatus = gameStatus;
        return this;
    }

    public void setGameStatus(GameStatus gameStatus) {
        this.gameStatus = gameStatus;
    }

    public String getDescription() {
        return description;
    }

    public Game description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Location getLocation() {
        return location;
    }

    public Game location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public User getOwner() {
        return owner;
    }

    public Game owner(User user) {
        this.owner = user;
        return this;
    }

    public void setOwner(User user) {
        this.owner = user;
    }

    public GameType getTypeOfGame() {
        return typeOfGame;
    }

    public Game typeOfGame(GameType gameType) {
        this.typeOfGame = gameType;
        return this;
    }

    public void setTypeOfGame(GameType gameType) {
        this.typeOfGame = gameType;
    }

    public Set<User> getPlayers() {
        return players;
    }

    public Game players(Set<User> users) {
        this.players = users;
        return this;
    }

    public Game addPlayers(User user) {
        this.players.add(user);
        return this;
    }

    public Game removePlayers(User user) {
        this.players.remove(user);
        return this;
    }

    public void setPlayers(Set<User> users) {
        this.players = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Game game = (Game) o;
        if (game.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), game.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Game{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", beginTime='" + getBeginTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", numberOfPlayers='" + getNumberOfPlayers() + "'" +
            ", requiredNumberOfPlayers='" + getRequiredNumberOfPlayers() + "'" +
            ", gameStatus='" + getGameStatus() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
