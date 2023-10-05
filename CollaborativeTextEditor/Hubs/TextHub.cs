using Microsoft.AspNetCore.SignalR;

namespace CollabTextEditor
{
    public class TextHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "group1");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "group1");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task BroadcastText(string text)
        {
            await Clients.OthersInGroup("group1").SendAsync("ReceiveText", text);
        }
    }
}
