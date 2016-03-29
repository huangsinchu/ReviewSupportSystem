package review.system.api.resources;

import javax.annotation.PostConstruct;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import review.system.entity.User;

@Path("/user")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface UserService {
	
	@GET
	@Path("/{id}")
	User getUser(@PathParam("id") Long id);
	
	@POST
	@Path("/")
	void createUser(@Valid User user);
	
}
