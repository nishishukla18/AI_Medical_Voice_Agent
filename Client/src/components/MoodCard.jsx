const moodEmoji = {
  happy: "😊",
  calm: "😌",
  sad: "😔",
  angry: "😠",
  anxious: "😟",
  stressed: "😣",
  lonely: "🥺",
  confused: "😕",
  neutral: "😐",
  mixed: "😶",
};

const MoodCard = ({ mood }) => {
  return (
    <div className="animate-fade-in-up rounded-2xl border border-[#322F5C] bg-[#1C1A3B] p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#12112A] text-xl">
          {moodEmoji[mood.mood] || "🙂"}
        </div>

        <div>
          <h3 className="font-display text-base capitalize text-[#F4F2FA]">
            {mood.mood}
          </h3>
          <small className="font-mono-anon text-xs text-[#6C6791]">
            {new Date(mood.createdAt).toLocaleString()}
          </small>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-[#9C97BE]">Emotional intensity</span>
        <strong className="font-mono-anon text-[#F4F2FA]">
          {mood.intensity}/10
        </strong>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#322F5C]">
        <div
          className="h-full rounded-full bg-[#9B8CFF] transition-all"
          style={{ width: `${mood.intensity * 10}%` }}
        />
      </div>

      {mood.emotions?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {mood.emotions.map((emotion, index) => (
            <span
              key={index}
              className="rounded-full border border-[#322F5C] px-2.5 py-1 font-mono-anon text-xs text-[#9C97BE]"
            >
              {emotion}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodCard;
