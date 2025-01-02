import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {

  const {addOpinion} = use(OpinionsContext);
    
  async function shareOpinion (prevState, formData) {
    const title = formData.get("title");
    const body = formData.get("body");
    const userName = formData.get("userName");

    let errors = [];

    if (title.trim().length < 5) {
      errors.push("Tuitle must be at least 5 characters");
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Opinion must be between 10 and 300 characters");
    }

    if (!userName.trim()) {
      errors.push("Please entfder your name");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          title,
          body,
          userName,
        },
      };
    }
    // Send the data to the server
   await addOpinion({
      title,
      body,
      userName,
    });
    return { errors: null };
  }

  const [fromState, fromAction] = useActionState(shareOpinion, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={fromAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={fromState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={fromState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={fromState.enteredValues?.body}
          ></textarea>
        </p>
        {fromState.errors && (
          <ul className="errors">
            {fromState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
         <Submit />
      </form>
    </div>
  );
}
