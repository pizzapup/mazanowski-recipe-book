function ParseIngredient({ ing }) {
  const qtys = { 0.25: "1/4", 0.5: "1/2", 0.75: "3/4" };
  return (
    <li className="ing-item">
      <span className="ing-qty">
        {Math.floor(ing.quantity) ? ing.quantity : qtys[ing.quantity]}
      </span>
      <span className="ing-unit"> {ing.unit} </span>
      <span className="ing-product">{ing.product} </span>
    </li>
  );
}
const RecipeDetail = ({ recipe, ingredientsArray }) => {
  return (
    <>
      <div id={recipe.id} className="product">
        <div>
          <h3>{recipe.name}</h3>
          <img alt="" src={recipe.image} />
          <ul>
            <li>
              Ingredients:
              <ul>
                {ingredientsArray &&
                  ingredientsArray.map((i, idx) => (
                    <ParseIngredient ing={i} key={`${i}-${idx}`} />
                  ))}
              </ul>
            </li>
            <li>instructions: {recipe.instructions}</li>
            <li>preheat: {recipe.preheat}</li>
            <li>category: {recipe.category && recipe.category.title}</li>
            <li title={`recipe id: ${recipe.id}`}>
              recipe uploaded by: {recipe.username}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default RecipeDetail;
