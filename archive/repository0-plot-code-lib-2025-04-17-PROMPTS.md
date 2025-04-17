prompts/PRUNE.md
# prompts/PRUNE.md
Update the source file by applying the Mission Statement to prune any "drift" from the source file.
Do his pruning one area at a time and consider carefully the potential value against the cost of retaining this code.
Where possible reduce the complexity of the code if the value of that complexity is not clear (or low).prompts/unused/MISSION.md
# prompts/unused/MISSION.md
Create, vary or extend as the most significant feature you can think of inline with the Mission Statement by updating the source file.
prompts/unused/IDEATION.md
# prompts/unused/IDEATION.md
Generate a new feature file for a feature that will add value.
prompts/unused/REFINE.md
# prompts/unused/REFINE.md
Refine a feature so that it can be developed.
prompts/unused/FEATURE.md
# prompts/unused/FEATURE.md
Implement, vary or extend funcionality based on one of the features.
prompts/TESTS.md
# prompts/TESTS.md
Improve the test coverage by pragmatically examining likely paths and failure scenarios and adding tests.
When creating tests have 3 kinds of tests:
* single layer mocked tests covering the main functionality of the code and the most common alternate paths.
* deeper tests mocking at the external resource (e.g. file system or network) to tests a capability end to end.
* feature tests that provide a demonstration of the feature in action, these can consume real resources (e.g. the internet) or be mocked.
There should be tests for any examples given in the README and well as behaviours in the code.
prompts/README.md
# prompts/README.md
Refresh the README, consulting the guidance in CONTRIBUTING.md while retaining any relevant content and pruning irrelevant content.
Update examples by dru running the available command line options and adding the results to the README.
Bring the README up to date with the latest features and functionality.
Make the Readme of the standard that you would expect of a well maintained and used open source project.
If there is an API as exported functions, command lune arguments or HTTP endpoints, then included examples of these in the README.
prompts/UNCLEBOB.md
# prompts/UNCLEBOB.md
**Prompt Prime Fragment:**

"Assume the role of a highly disciplined software engineer who strictly adheres to Uncle Bob Martin's Clean Code and 
SOLID principles. Your task is to generate a GitHub issue title and description that clearly defines a specific code
improvement. The issue should meet the following criteria:

- **Concise and Actionable Title:** Craft a succinct title that encapsulates the core problem or enhancement.
- **Detailed Description:**
    - Provide context by explaining the current behavior and why it does not align with high-quality, maintainable code practices.
    - Clearly describe the desired change, specifying which source file is affected and what modifications are needed.
    - Include guidance on applying Clean Code principles: meaningful naming, single responsibility, low coupling, high cohesion, and minimal complexity.
    - Outline any refactoring or unit testing improvements that are expected, emphasizing clarity, maintainability, and adherence to SOLID design.

Ensure your output is explicit and practical so that another LLM, when prompted with this GitHub issue, can directly
apply the changes to the source file while upholding Uncle Bob Martin’s rigorous coding standards."
