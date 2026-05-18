const RecommendationCard = ({ result }) => {

  return (

    <div className="bg-white shadow-xl rounded-2xl p-6 mt-6">

      <h2 className="text-2xl font-bold mb-4">
        AI Recommendation
      </h2>

      <p className="whitespace-pre-line">
        {result}
      </p>

    </div>
  );
};

export default RecommendationCard;