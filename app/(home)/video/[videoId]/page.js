export default async function VideoPage({ params }) {
  const { videoId } = await params;
  return (
    <div className="w-screen flex justify-center mt-80 object-contain">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        width={600}
        height={400}
      />
    </div>
  );
}
