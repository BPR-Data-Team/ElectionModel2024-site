import styles from "./page.module.css";
import type { Metadata } from "next";
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export const metadata: Metadata = {
  title: "Methodology | 24cast.org",
};

const textL = `<p>Let $X_i$, a random variable, be the margin of the $i$th poll for a given race. We can represent $X_i=X_i(\\vec a)$ where $\\vec{a}$ represents the different factors in a poll: methodology, time until the election, pollster, sample size, etc.</p>
<p>Let $\\mu$ be the true margin of the race. Our goal is to get an unbiased estimate $\\hat{\\mu}$ with minimum variance. To do this, we need two things for $X_i$:</p>
<ol>
<li>Bias ($B_i$): $\\mathbf{E}\\left[X_i(\\vec{a}) - \\mu
\\right]$</li>
<li>Variance ($\\sigma^2_i$): $\\mathbf{E}\\left[(X_i(\\vec{a}) - \\mathbf{E}[X_i(\\vec{a})])^2 \\right]$
</li>
</ol>
<p>We&apos;d then use a tool called <b>bias-adjusted inverse-variance weighing</b>, and get the estimate via the following formula:</p>\\[
\\hat{\\mu} = \\frac{\\sum_{i=1}^n \\frac{(X_i - B_i)}{\\sigma^2_i}}{\\sum_{i=1}^n \\frac{1}{\\sigma^2_i}}
\\]
<p>This formula finds <b>exactly</b> what we want: an unbiased, minimum-variance estimate for the margin of the race these polls are trying to predict. All that&apos;s left is to find a way to determine the bias and variance for every poll. This is... easier said than done.</p>
<p>Bias is relatively simple: we create an algorithm (in this case, using SVM) that takes in $\\vec{a}$ and predicts $X_i - \\mu$ for each poll.</p>
<p>Variance is more difficult. The variance of a poll does not depend on the true margin, but counterfactual worlds where the result of the poll is different due to pure randomness. Of course, some polls may have different variances, due to methodology, etc.</p>
<p>Instead of creating an algorithm to predict the variance for each poll (an impossible task), we instead predicted the MSE (mean-squared error): $(X_i - \\mu)^2$.</p>
<p>A well-known mathematical formula called <b>bias-variance decomposition</b> relates these formulas. In particular, it says that $MSE = B^2 + \\sigma^2$. We&apos;ve got bias, and we&apos;ve got MSE -- so we can easily calculate variance from each poll.</p>
<p>With that done, we can use bias-adjusted inverse-variance weighing and get what is essentially the mathematically best possible polling average.</p>
<p>There&apos;s a couple more specifics:</p>
<ol>
<li>We use squared-error for our loss function on these algorithms, since minimizing the MSE is equivalent to finding the mean (and that&apos;s exactly what we want, seeing as how the mean is merely a sample version of the expected value).</li>
<li>For our variables, we use: sample size, partisanship of the pollster, methodology (one-hot), how long since the poll was conducted, and which pollster conducted the poll (one-hot, only including pollsters with more than 20 historical polls)</li>
</ol>
<p>Once we&apos;re done with all this math, we create a series of different variables related to polling. We create the following:</p>
<ol>
<li>Bias-adjusted inverse-variance weighted mean estimate</li>
<li>Bias-adjusted inverse-variance weighted lower estimate (95% CI)</li>
<li>Bias-adjusted inverse-variance weighted upper estimate (95% CI)</li>
<li>Unweighted mean estimate (a simple average of the polls)</li>
<li>Unweighted lower estimate </li>
<li>Unweighted upper estimate</li>
</ol>
<p>Obviously, this polling methodology is not perfect. While it did reduce our average error by 10%, it&apos;s only as good as the data it is given. Each year, the political environment of America finds new ways to mess up polling&mdash;and there&apos;s effectively nothing aggregators can do about it. What we can do is look to the past and take every bit of knowledge we can glean, and that&apos;s exactly what this change does!</p>
`

const Methodology: React.FC = () => {
  return (
      <div className={styles.overall}>
        <div className={styles.center}>
              <h1>Methodology</h1>
          </div>
          <div className={styles.main}>
            <h2>The TL;DR</h2>
            <ul>
            <li>We gather and clean data from 2002 to 2022, including factors like incumbency, campaign finance, polls, and expert ratings. We then train our model on this data to predict the difference between the Democrat and Republican vote proportions.</li>
            <li>Using the trained model and the same data from 2024, we predict the margin for 2024. Our model also gives the uncertainty for each prediction, based on the randomness of data like polling and campaign finance.</li>
            <li>Given this uncertainty, we simulate many different possible elections and find how often each party will win a race.</li>
            </ul>
            </div>
            <div className={styles.main}>
            <h2>Overall Model</h2>
            <p>We decided to create our model because we noticed an unfilled niche in the field of election prediction. Despite the rapid growth of machine learning (ML) algorithms over the past decade, few (if any) groups applied them to election prediction. Many people believe that complex ML algorithms are difficult, if not impossible, to interpret. We have worked hard to ensure that our predictions are easy to understand while remaining extremely accurate.
            Here&apos;s a brief summary of how the 24cast.org model works:</p>
            <ol>
            <li>Input training data: This data contains both the <i>input</i> variables (e.g. polls) and the output variable (in our case, Democrat % &minus; Republican %, or the &ldquo;margin&rdquo;). This data comes from already-known elections—specifically, elections from 2002 to 2022.</li>
            <li>Train the model on this data: The model (hopefully) learns key relationships between the input and output variables. The simplest example of such a model is a linear regression. By fitting a line through data, one can somewhat easily understand relationships such as &ldquo;when Republicans are ahead in polls, they often win elections&rdquo;.</li>
            <li>Predict new results: In this case, there is no output variable, only input variables. We don&apos;t know the margins of the 2024 elections (if we did, all of this would be unnecessary!). What we do have is a list of all the polls/campaign finance/etc that is cleaned and filtered in the same manner as before. The model then uses this information to predict what it thinks the output variable (the margin) will be. Ideally, the more a model can understand complex and unique relationships between variables, the more accurate it will be in predicting the results. 
            </li></ol>
            <p>In our case, we trained 1000 decision-tree models. Each branch of this tree looks at where data tends to &ldquo;split&rdquo;. For example, that might be in expert ratings: there is often a significant difference between races with a &ldquo;Lean R&rdquo; rating and a &ldquo;Toss-up&rdquo; rating. The model would (and has) learned this difference and analyzes the two sets of data separately. After many splits, the data is more easily distinguished—for example, into &ldquo;Clear Democrat&rdquo; races versus &ldquo;Toss-ups&rdquo;. To predict future data, it simply sends the data down the tree and gives the final result. By itself, one tree is fairly useless, but, combined, they can learn complex relationships between noisy data (like polls) and achieve high accuracy in areas other models cannot. We used <a className={styles.linkText} href="https://papers.nips.cc/paper_files/paper/2017/hash/6449f44a102fde848669bdd9eb6b76fa-Abstract.html" >LightGBM</a>, a tree-based model designed in 2017 that quickly rose to stardom in machine learning competitions.</p>
            <p>Using these <i>already-trained</i> models, we saw what they would have predicted in 2002-2022. Based on the errors of those predictions, we trained a second model: this time, to predict the standard deviation, assuming a normal distribution of predictions for each individual race. In math terms, we trained a second model to maximize the mean log-likelihood of the standard deviation, given the true margins and the predicted margins. After training this model, we ran it on 2024 predictions to calculate the final standard deviation. That&apos;s what allows us to take simulations from each race. </p>
            <p>With a normal distribution for each race (and correlations, given by SHAP–see below) we create a multivariate normal distribution describing every race in the 2024 election. By taking samples from this distribution, we effectively &ldquo;simulate&rdquo; a possible election. By doing this many times, we can understand the likelihood of events on a national scale, even without assuming normality. </p>
            </div>
            <div className={styles.main}>

            <h4>Data Used</h4>
            <p>We used data from FiveThirtyEight, Cook Political Report, Sabato&apos;s Crystal Ball, and FRED, among many others. A list of attributed data sources can be found in our <a className={styles.linkText} href="https://github.com/BPR-Data-Team/ElectionModel2024/blob/main/DataCitations.md">GitHub</a>. Our final dataset had more than 100 columns, with data ranging from polling averages to campaign finance to voting restrictions. The full list can be found <a className={styles.linkText} href="https://github.com/BPR-Data-Team/ElectionModel2024/tree/main/cleaned_data">here</a>, but there are a few specific columns that merit additional discussion on this page.</p>

            <h3>Generic Ballot</h3>
            <p>The generic ballot (defined as the national Democratic % - Republican %) is a key feature in our predictions. Though it does not play a large role by itself, when added to past elections (for example, how much more Democratic a state is relative to the generic ballot), it becomes very useful. As such, we define a series of different generic ballots, allowing the model to decide which is more important. They are:</p>
            <ol>
            <li>Generic ballot via polls: By conducting a similar meta-analysis on generic ballot polls, we can calculate two different poll-based generic ballots: unweighted and weighted. </li>
            <li>Generic ballot via campaign finance: In our initial runs of the model, we noticed that campaign finance explains a significant amount of variance in elections–far more than we had expected. We calculate campaign finance ratios via the following formula: A * log(total Democrat receipts / total Republican receipts). We don&apos;t know what A is, so we included multiple different versions of A and let our model determine which was most effective for us.</li>
            </ol>
            <h3>Incumbent Differential</h3>
            <p>In addition to including incumbency in our model, we also include how much better a given incumbent performs than we&apos;d expect, given their jurisdictions Cook PVI and Generic Ballot. This allows us to more accurately predict races like Vermont&apos;s Gubernatorial where a Republican will almost certainly win despite the state itself being a safe Democratic seat for presidency.
            </p>

            <h3>Pollster Ratings</h3>
            <p>After September 11, 2024 (<a href="#changelog" className={styles.linkText}>see details in our changelog</a>), our polling averaging methodology became significantly more accurate. It has also become significantly more complicated. We&apos;re providing both a high-level overview of our method and a low-level mathematical description for those who may be interested.</p>
            <p><i>High-Level Overview:</i></p>
            <p>Our main goal was to maximize the amount of information we can get out of every poll. Polls report a detailed methodology, sample size, conflicts of interest, etc. There is a significant amount of data for those who are willing to look&mdash;so that&apos;s exactly what we did!</p>
            <p>Previously, we only took three things into account in our pollster averages:</p>
            <ol>
              <li>Sample size</li>
              <li>Online/offline methodology</li>
              <li>How good a pollster is, keeping all other factors constant (like methodology)</li>
            </ol>
            <p>This creates a fairly good polling average! However, it leaves out key information (what about other methodologies, or partisanship in pollsters?) that we simply could not fit in our already-large model without significantly increasing error. We&apos;ve instead created machine learning models that predict how well each poll will perform, given their methodology, pollster history, sample size, time since poll conducted, and partisanship of the pollster. We then combine these polls to get what is effectively the most mathematically accurate pollster averages given the information we have.</p>
            <p><i>Low-Level Math:</i></p>
            <Latex>{textL}</Latex>
            </div>
            <div className={styles.main}>
            <h2>Backtesting</h2>
            <p>Though we did technically create a BPR-affiliated model for the 2022 Senate elections, 24cast.org is the first iteration that utilizes the full extent of modern ML methods for prediction and interpretation. To ensure our model would perform well for 2024 elections, we could not rely on our past predictions as we didn&apos;t have any! As such, we decided to backtest on the past two elections and compare our results to other models. We tested our model several different times (effectively, selecting random elections from the pre-2020 training data, in a method called bootstrapping) and found that we were more accurate than every other election model 60% of the time in 2020 and 70% of the time in 2022. With the addition of 2022 training data, we expect our 2024 model to outperform our back-tested models. However, election prediction is a probabilistic endeavor, not a guarantee – which is why we have distributions of possible outcomes.</p>
            </div>
            <div className={styles.main}>
            <h2>Predictions for 2024</h2>
            </div>
            <div className={styles.main}>
            <h4>Updating Data</h4>
            <p>Our model updates each day at midnight EDT with the latest data. Our predictions will constantly update as polls, campaign finance, and expert ratings change. Our model will finish updating on the day before the election. We use GitHub Actions and AWS with DynamoDB to gather new data and update our API, and R and Python to clean/analyze the incoming data while producing up-to-date predictions.
            </p>
            <p>We will update the website with a purple banner at the top of the page whenever our predictions change significantly. This could be due to an influx of new polls, a change in expert ratings, or a new campaign finance report. We will also update the website with a banner when we release a new feature to our model, such as our campaign finance simulator.
            </p>
            </div>
            <div className={styles.main}>
            <h4>Interpretation</h4>
            <p>To interpret our results, we used a method called SHAP, or <b>Sh</b>apley <b>A</b>dditive Ex<b>p</b>lanations (a weird acronym, we know). Shapley values originate from cooperative game theory, where a &ldquo;game&rdquo; involves a set of players who cooperate, and the goal is to fairly distribute the &ldquo;payout&rdquo; among them based on their contribution. The math of SHAP values is too detailed to include here, but they can be easily found in their <a className={styles.linkText} href="https://www.nature.com/articles/s42256-019-0138-9">journal paper</a>. In simple terms, a SHAP value for a single feature is determined by what the model would predict if that feature was not included in the prediction. SHAP values are especially useful for tree-based models like LightGBM. In our case, SHAP gives importance values for each feature and each prediction, allowing for easy interpretation of how features like campaign finance affect margins. We hope that our work to make our predictions interpretable gives our readers a better understanding of the factors that most heavily impact the results of elections. 
            </p>

            <p>SHAP values are also useful because they provide an easy way to understand how races are interlinked. When we have local importances for each race, we can determine the correlation between races. North Carolina and Georgia, for example, are very similar states and thus have close correlations. SHAP agrees with this – past elections play a huge role in both states with a similar magnitude/direction.</p>
            </div>
            <div className={styles.main}>
            <h2>Learn More</h2>
            <p>While we aim to be as transparent as possible, there were so many minute issues we faced as we created this model that describing all of them would take an entire book. If you&apos;re interested in looking at our code, check out our GitHub! If you have more specific math questions (or if you&apos;re confused by any of our code) feel free to reach out to <a className={styles.linkText} href="mailto:24castbpr@gmail.com">our team</a>. We&apos;re always willing to nerd out about data and politics, so we&apos;ll try and respond ASAP!</p>
            </div>
            <div className={styles.main} id="changelog">
            <h2>Changelog</h2>
            <p><b>September 11:</b> Consistent website visitors (or viewers of our new historical graphs) may notice a change of our predictions on September 11. In preparation for the final 50 days, we&apos;ve made 3 under-the-hood changes that have especially impacted our predictions for the Presidential and House elections. As a fully open-source model, we want to make sure everybody knows exactly what these changes are and why we made them. We&apos;re particularly proud of the first of these changes, which was a multi-month, combined effort of mathematics specialists designing a method to get the maximum value out of every single poll.</p>
            <p><i>Poll Averaging:</i></p>
            <p>We’ve completely revamped our polling averaging methodology. Read our Polling Average section in this methodology for a detailed explanation of our new methods and their mathematical underpinnings.</p>
            <p><i>Generic Ballot (and regex…):</i></p>
            <p>When we searched through our codebase again to remove any possible problems, we noticed a problem with one of our lines of regex that utilized 2020 generic ballot results instead of 2022 generic ballot results for some House races. This meant that we erroneously underestimated the strength of strong House incumbents. The combination of this and our improved polling averages pushed our predictions for some House races a few points to the left. We now think Democrats are clear favorites to take the House.</p>
            <p><i>Candidates that dropped out:</i></p>
            <p>Some candidates, such as Chris Sununu (NH-R), recently announced they would not seek reelection despite having the opportunity to. We&apos;ve removed incumbency status from these races. This affected around 20 total races across all Senate, House, and Governor races.</p>
            <p><b>August 20:</b> Our team identified that, though we had filtered Vice President Harris from state-specific polls before President Biden&apos;s withdrawal from candidacy, generic ballot polls for Harris pre-withdrawal remained in our dataset. We have updated our codebase to remove all pre-withdrawal presidential polls—both state-specific and generic. This change and an influx of new polls during and directly before the DNC have resulted in a significant shift leftward for congressional and presidential races.</p>
            <p><b>August 3: </b> Previously, our model predicted the outcome of the upcoming November 5 election by incorporating uncertainty into the polls to account for increased unpredictability as we move further from the election date. However, we have decided to eliminate this added uncertainty and instead predict the election results <b>as if the election were held today.</b> This change minimizes assumptions and more accurately reflects the output of our machine learning algorithm without adding uncertainty.</p>
            </div>
            </div>
  );
};


export default Methodology;