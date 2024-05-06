import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology | 24cast.org",
};

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
<li>Input training data: This data contains both the <i>input</i> variables (e.g. polls) and the output variable (in our case, Democrat%&minus;Republican%, or the &ldquo;margin&rdquo;). This data comes from already-known elections—specifically, elections from 2002 to 2022.</li>
<li>Train the model on this data: The model (hopefully) learns key relationships between the input and output variables. The simplest example of such a model is a linear regression. By fitting a line through data, one can somewhat easily understand relationships such as &ldquo;when Republicans are ahead in polls, they often win elections&rdquo;.</li>
<li>Predict new results: In this case, there is no output variable, only input variables. We don&apos;t know the margins of the 2024 elections (if we did, all of this would be unnecessary!). What we do have is a list of all the polls/campaign finance/etc that is cleaned and filtered in the same manner as before. The model then uses this information to predict what it thinks the output variable (the margin) will be. Ideally, the more a model can understand complex and unique relationships between variables, the more accurate it will be in predicting the results. 
</li></ol>
<p>In our case, we trained 1000 decision-tree models. Each branch of this tree looks at where data tends to &ldquo;split&rdquo;. For example, that might be in expert ratings: there is often a significant difference between races with a &ldquo;Lean R&rdquo; rating and a &ldquo;Toss-up&rdquo; rating. The model would (and has) learned this difference and analyzes the two sets of data separately. After many splits, the data is more easily distinguished—for example, into &ldquo;Clear Democrat&rdquo; races versus &ldquo;Toss-ups&rdquo;. To predict future data, it simply sends the data down the tree and gives the final result. By itself, one tree is fairly useless, but, combined, they can learn complex relationships between noisy data (like polls) and achieve high accuracy in areas other models cannot. We used <a className={styles.linkText} href="https://papers.nips.cc/paper_files/paper/2017/hash/6449f44a102fde848669bdd9eb6b76fa-Abstract.html" >LightGBM</a>, a tree-based model designed in 2017 that quickly rose to stardom in machine learning competitions.</p>
<p>Using these <i>already-trained</i> models, we saw what they would have predicted in 2002-2022. Based on the errors of those predictions, we trained a second model: this time, to predict the standard deviation, assuming a normal distribution of predictions for each individual race. In math terms, we trained a second model to maximize the mean log-likelihood of the standard deviation, given the true margins and the predicted margins. After training this model, we ran it on 2024 predictions to calculate the final standard deviation. That&apos;s what allows us to take simulations from each race. The farther away the election is, the more we multiply this standard deviation, to reflect the innate uncertainty of predicting an election so early in the season.</p>
<p>With a normal distribution for each race (and correlations, given by SHAP–see below) we create a multivariate normal distribution describing every race in the 2024 election. By taking samples from this distribution, we effectively &ldquo;simulate&rdquo; a possible election. By doing this many times, we can understand the likelihood of events on a national scale, even without assuming normality. </p>
</div>
<div className={styles.main}>

<h4>Data Used</h4>
<p>We used data from FiveThirtyEight, Cook Political Report, Sabato&apos;s Crystal Ball, and FRED, among many others. A list of attributed data sources can be found in our <a className={styles.linkText} href="https://github.com/BPR-Data-Team/ElectionModel2024/blob/main/DataCitations.md">GitHub</a>. Our final dataset had more than 100 columns, with data ranging from polling averages to campaign finance to voting restrictions. The full list can be found <a className={styles.linkText} href="https://github.com/BPR-Data-Team/ElectionModel2024/tree/main/cleaned_data">here</a>, but there are a few specific columns that merit additional discussion on this page.</p>

<h3>Polls</h3>
<p>Below, we describe how we get pollster ratings. However, we must aggregate these ratings into a single number afterward for them to be useful in any way. We do so by conducting a meta-analysis of the polls, in two different ways: </p>
<ol>
<li>Unweighted average: In this average, we do not care about pollster ratings. We take the standard deviation of each poll (calculated by the sample size) and conduct a meta-analysis over all polls in that race, getting an unweighted estimate, as well as a lower and upper bound. </li>
<li>Weighted average: Here, we do care about pollster ratings. We translate the often-negative rating to a positive value via softmax, which means that each race has a set of weights that add to 1. Similarly to the unweighted average, we conduct a weighted meta-analysis based on the sample size and get a lower/upper bound</li>
</ol>
<p>Since online/phone polls often reach completely different results based on the age groups they contact more heavily, we conduct additional meta-analyses to get the expected online poll margin and phone poll margin. This allows our model to correct for any major discrepancies in young/old voters between different polling methods. 
 
</p>
<h3>Generic Ballot</h3>
<p>The generic ballot (defined as the national Democratic % - Republican %) is a key feature in our predictions. Though it does not play a large role by itself, when added to past elections (for example, how much more Democratic a state is relative to the generic ballot), it becomes very useful. As such, we define a series of different generic ballots, allowing the model to decide which is more important. They are:</p>
<ol>
<li>Generic ballot via polls: By conducting a similar meta-analysis on generic ballot polls, we can calculate two different poll-based generic ballots: unweighted and weighted. </li>
<li>Generic ballot via campaign finance: In our initial runs of the model, we noticed that campaign finance explains a significant amount of variance in elections–far more than we had expected. We calculate campaign finance ratios via the following formula: A * log(total Democrat receipts / total Republican receipts). We don&apos;t know what A is, so we included multiple different versions of A and let our model determine which was most effective for us.</li>
</ol>
<h3>Incumbent Differential</h3>
<p>In addition to including incumbency in our model, we also include how much better a given incumbent performs than we&apos;d expect, given their jurisdictions Cook PVI and Generic Ballot. This allows us to more accurately predict races like Vermont&apos;s Gubernatorial where a Republican will almost certainly win despite the state itself being a safe Democratic seat for presidency.
</p>
</div>
<div className={styles.main}>
<h3>Pollster Ratings</h3>
<p>To analyze polls, we decided to create our own pollster ratings. If we created one pollster rating for 2024, we could not apply that rating to previous elections since we would be using the results of polls from those years to predict those same elections. In the data science world, this is called &ldquo;data leakage&rdquo; and it&apos;s a problem we faced at every stage of our work. We wanted to be as sure as possible that our predictions reflected the data we would have prior to the election, and data leakage would destroy that very important assumption.</p>
<p>To avoid data leakage here, we created a new set of pollster ratings for every election year, based on all polls within the last 12 years of that election. So, in our training data for the 2020 election, we used polls from 2008-2018 to get pollster ratings. We developed a 4-step process for determining pollster ratings for an election year.</p>
<ol>
<li>For all polls of the previous 12 years, we first trained an XGBoost algorithm on all pollster-agnostic features (sample size, type of election, year, online/call, etc.) to predict how different methodologies affect pollster error (which we defined as |predicted margin - actual margin|).</li>
<li>We then used this algorithm to see how much error we&apos;d expect each poll to have, given the pollster-agnostic features. For example, our pollster-rating model might predict that a poll conducted (1) six weeks before an election, (2) using landlines, and (3) in a house race, would have 3.5 points of error on average.</li>
<li>For every poll, calculate how much better/worse that pollster was than what we would expect, given their methodology.</li>
<li>Combine these polls to get the standard deviation and average for each pollster, and construct confidence intervals for each pollster&apos;s differential. Since most pollsters did not conduct enough polls to assume normality in the distribution of errors, we used a t-distribution to find a 95% confidence interval. From there, we calculated the <b>lower bound</b> on each pollster&apos;s differential. In the case of pollsters with only 1 past poll, we cannot construct a confidence interval, so we do not include them in the list of ranked pollsters.</li>
</ol>
<p>After all of this math, what we get is a <i>worst-case</i> guess for how a pollster fares compared to others using the same methodology. A positive value in this weight gives us confidence that the pollster has conducted enough high-quality polls that it will continue to perform better than other pollsters with the same methodology. For those who want to see who these pollsters are, check out our <a className={styles.linkText} href="https://github.com/BPR-Data-Team/ElectionModel2024/blob/main/cleaned_data/Pollster%20Ratings.csv">Pollster Ratings</a> file on our GitHub repository.</p>
<p>We then ran these models on every election going back to 2002. The pollster ratings used for our current predictions come from polls conducted between 2010-2022. </p>
</div>
<div className={styles.main}>
<h2>Backtesting</h2>
<p>Though we did technically create a BPR-affiliated model for the 2022 Senate elections, 24cast is the first iteration that utilizes the full extent of modern ML methods for prediction and interpretation. To ensure our model would perform well for 2024 elections, we could not rely on our past predictions as we didn&apos;t have any! As such, we decided to backtest on the past two elections and compare our results to other models. We tested our model several different times (effectively, choosing random elections from our simulations) and found that we were more accurate than every other election model 60% of the time in 2020 and 70% of the time in 2022. With the addition of 2022 training data, we expect our 2024 model to outperform our back-tested models. However, election prediction is a probabilistic endeavor, not a guarantee – which is why we have distributions of possible outcomes.</p>
</div>
<div className={styles.main}>
<h2>Predictions for 2024</h2>
</div>
<div className={styles.main}>
<h4>Updating Data</h4>
<p>Our model updates each day at midnight EDT with the latest data. Our predictions will constantly update as polls, campaign finance, and expert ratings change. Our model will finish updating on the day before the election. We use GitHub Actions and AWS with DynamoDB to gather new data and update our API, and R and Python to clean/analyze the incoming data while producing up-to-date predictions.</p>
</div>
<div className={styles.main}>
<h4>Interpretation</h4>
<p>To interpret our results, we used a method called SHAP, or <b>Sh</b>apley <b>A</b>dditive Ex<b>p</b>lanations (a weird acronym, we know). Shapley values originate from cooperative game theory, where a &ldquo;game&rdquo; involves a set of players who cooperate, and the goal is to fairly distribute the &ldquo;payout&rdquo; among them based on their contribution. The math of SHAP values is too detailed to include here, but they can be easily found in their <a className={styles.linkText} href="https://www.nature.com/articles/s42256-019-0138-9">journal paper</a>. SHAP values are especially useful for tree-based models like LightGBM. In our case, SHAP gives importance values for each feature and each prediction, allowing for easy interpretation of how features like campaign finance affect margins. We hope that our work to make our predictions interpretable gives our readers a better understanding of the factors that most heavily impact the results of elections. 
</p>

<p>SHAP values are also useful because they provide an easy way to understand how races are interlinked. When we have local importances for each race, we can determine the correlation between races. North Carolina and Georgia, for example, are very similar states and thus have close correlations. SHAP agrees with this – past elections play a huge role in both states with a similar magnitude/direction.</p>
</div>
<div className={styles.main}>
<h2>Learn More</h2>
<p>While we aim to be as transparent as possible, there were so many minute issues we faced as we created this model that describing all of them would take an entire book. If you&apos;re interested in looking at our code, check out our GitHub! If you have more specific math questions (or if you&apos;re confused by any of our code) feel free to reach out to <a className={styles.linkText} href="mailto:24castbpr@gmail.com">our team</a>. We&apos;re always willing to nerd out about data and politics, so we&apos;ll try and respond ASAP!</p>
</div>

      </div>

  );
};


export default Methodology;