package review.system.api.resources;

import java.util.ArrayList;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import review.system.entity.ContactGroup;

@Path("/group")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface GroupService {
	@GET
	@Path("/{id}")
	ContactGroup getGroup(@PathParam("id") Long id);

	@GET
	@Path("/")
	ArrayList<ContactGroup> getGroupByUser(@QueryParam("uid") Long uid);

	@POST
	@Path("/")
	Long createGroup(@Valid ContactGroup group);

	@DELETE
	@Path("/{id}")
	void deleteGroup(@PathParam("id") Long id);
}
