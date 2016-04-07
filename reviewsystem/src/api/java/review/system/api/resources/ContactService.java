package review.system.api.resources;

import java.util.ArrayList;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import review.system.entity.Contact;

@Path("/contact")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface ContactService {
	@GET
	@Path("/{id}")
	Contact getContact(@PathParam("id") Long id);

	@GET
	@Path("/")
	ArrayList<Contact> getContactByGroup(@QueryParam("groupId") Long groupId);

	@POST
	@Path("/")
	void createContact(@Valid Contact contact);
}
