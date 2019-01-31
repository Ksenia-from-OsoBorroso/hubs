/**
 * Registers a click handler and invokes the kick method on the NAF adapter for the owner associated with its entity.
 * @namespace network
 * @component kick-button
 */
AFRAME.registerComponent("kick-button", {
  init() {
    this.onClick = () => {
      this.kick(this.owner);
    };
    NAF.utils.getNetworkedEntity(this.el).then(networkedEl => {
      this.owner = networkedEl.components.networked.data.owner;
    });
  },

  play() {
    this.el.addEventListener("grab-start", this.onClick);
  },

  pause() {
    this.el.removeEventListener("grab-start", this.onClick);
  },

  async kick(clientId) {
    const { permsToken } = await this.el.sceneEl.systems.permissions.fetchPermissions();
    NAF.connection.adapter.kick(clientId, permsToken);
    window.APP.hubChannel.kick(clientId);
  }
});
