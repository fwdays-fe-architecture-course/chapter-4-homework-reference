const fetch = require("node-fetch");

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  try {
    const response = await fetch("https://swapi.dev/api/people/");
    const data = await response.json();

    console.log("data", data);

    data.results.forEach((character) => {
        const nodeData = {
            ...character,
            id: createNodeId(`star-wars-character-${character.name}`),
            internal: {
                type: "StarWarsCharacter",
                contentDigest: createContentDigest(character)
            }
        }

        createNode(nodeData);
    })
  } catch (error) {
    console.error("Error fetching Star Wars data:", error);
  }
};
