import ActionFeed from "../components/actions/ActionFeed";

const UserActions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Eco Community Feed</h1>
          <p className="mt-1 text-sm text-slate-600">
            Share your sustainable actions with the community.
          </p>
        </div>

        <ActionFeed />
      </div>
    </div>
  );
};

export default UserActions;